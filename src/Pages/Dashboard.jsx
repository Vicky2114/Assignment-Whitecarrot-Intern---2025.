import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { FaSignOutAlt, FaCalendarPlus, FaFilter } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

function Dashboard({ session, onSignOut }) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); // Set to 7 days ago
    return date;
  });
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Set to 7 days from today
    return date;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!eventName) {
      formErrors.eventName = "Event Name is required.";
    }
    if (!eventDescription) {
      formErrors.eventDescription = "Event Description is required.";
    }
    if (!start || !end || start >= end) {
      formErrors.dateTime = "Start time must be earlier than end time.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const fetchEventsBetweenDates = async (startDate, endDate) => {
    // Convert startDate and endDate to ISO strings (UTC format)
    const timeMin = new Date(startDate).toISOString();
    const timeMax = new Date(endDate).toISOString();

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&orderBy=startTime&singleEvents=true`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.provider_token, // Ensure session.provider_token is valid
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data.items || []);
      console.log(data.items);
      setFilteredEvents(data.items || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEventsBetweenDates(fromDate, toDate);
    }
  }, [session, fromDate, toDate]);

  const createCalendarEvent = async () => {
    if (!validateForm()) {
      return;
    }
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
          body: JSON.stringify(event),
        }
      );
      const data = await response.json();
      if (data) { 
        await fetchEventsBetweenDates(fromDate, toDate);
      }
      alert("Event created, check your Google Calendar!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleFilterChange = () => {
    const filtered = events.filter((event) => {
      // Convert event start and end times to UTC Date objects
      const eventStartUTC = new Date(event.start.dateTime).getTime(); // UTC timestamp
      const eventEndUTC = new Date(event.end.dateTime).getTime(); // UTC timestamp

      // Convert fromDate to a UTC timestamp
      const fromDateUTC = new Date(fromDate).getTime(); // Ensure fromDate is also UTC
      const toEndDateUTC = new Date(toDate).getTime(); // Ensure toEndDate is also UTC
      console.log(fromDateUTC);
      console.log(toEndDateUTC);
      // Filter condition based on UTC timestamps
      return eventStartUTC >= fromDateUTC;
    });

    console.log(filtered);
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset pagination when filters change
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  return (
    <div className="flex">
      {/* Left Panel */}
      <div className="w-[40%] h-[100vh] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-left">
          Welcome, {session?.user?.identities[0]?.identity_data.name}
        </h2>
        <button
          onClick={onSignOut}
          className="flex items-center mt-6 text-red-600 hover:text-red-800"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white flex items-center text-left">
            <FaCalendarPlus className="mr-2" /> Create Event
          </h3>
          <div className="mt-6">
            <label className="block text-sm font-medium text-white text-left">
              Event Name
            </label>
            <input
              type="text"
              className={`w-full p-3 mt-2 border rounded-md ${
                errors.eventName ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEventName(e.target.value)}
            />
            {errors.eventName && (
              <p className="text-red-500 text-xs mt-1">{errors.eventName}</p>
            )}

            <label className="block text-sm font-medium text-white mt-6 text-left">
              Event Description
            </label>
            <input
              type="text"
              className={`w-full p-3 mt-2 border rounded-md ${
                errors.eventDescription ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            {errors.eventDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.eventDescription}
              </p>
            )}

            <label className="block text-sm font-medium text-white mt-6 text-left">
              Start
            </label>
            <DateTimePicker
              onChange={setStart}
              value={start}
              className={`w-full p-3 mt-2 border rounded-md ${
                errors.dateTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateTime && (
              <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>
            )}

            <label className="block text-sm font-medium text-white mt-6 text-left">
              End
            </label>
            <DateTimePicker
              onChange={setEnd}
              value={end}
              className={`w-full p-3 mt-2 border rounded-md ${
                errors.dateTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateTime && (
              <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>
            )}

            <button
              onClick={createCalendarEvent}
              className="mt-6 px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[60%] ml-6 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center ">
            <FaFilter className="mr-2" /> Filter Events
          </h3>
          <button
            onClick={handleFilterChange}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            <MdSearch className="mr-2" /> Apply Filter
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 text-left">
            From Date
          </label>
          <div className="w-[70%] ml-6 text-left">
            <DateTimePicker
              onChange={setFromDate}
              value={fromDate}
              className="w-[70%] p-3 mt-2 border rounded-md "
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mt-6 text-left">
            To Date
          </label>
          <div className="w-[70%] ml-6 text-left">
            <DateTimePicker
              onChange={setToDate}
              value={toDate}
              className="w-[70%] p-3 mt-2 border rounded-md "
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
          Past Events
        </h3>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-gray-300 text-left">
                Event Name
              </th>
              <th className="p-3 border border-gray-300 text-left">
                Description
              </th>
              <th className="p-3 border border-gray-300 text-left">Start</th>
              <th className="p-3 border border-gray-300 text-left">End</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr
                key={event.id}
                className="bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="p-3 border border-gray-300">
                  {event.summary || "No Title"}
                </td>
                <td className="p-3 border border-gray-300">
                  {event.description ? (
                    isHTML(event.description) ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    ) : (
                      event.description
                    )
                  ) : (
                    "No Description"
                  )}
                </td>

                <td className="p-3 border border-gray-300">
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </td>
                <td className="p-3 border border-gray-300">
                  {new Date(
                    event.end.dateTime || event.end.date
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-lg font-semibold">{currentPage}</span>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={indexOfLastEvent >= filteredEvents.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
