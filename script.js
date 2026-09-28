let selectedSeats = [];

let selectedBus = null;


// ==========================================
// SEARCH BUSES
// ==========================================

function searchBuses() {

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;

    const date =
        document.getElementById("date").value;

    const busList =
        document.getElementById("bus-list");


    if (
        from === "" ||
        to === "" ||
        date === ""
    ) {

        alert(
            "Please select From, To and Date."
        );

        return;
    }


    if (from === to) {

        alert(
            "From and To cities cannot be the same."
        );

        return;
    }


    const availableBuses =
        buses.filter(function(bus) {

            return (
                bus.from === from &&
                bus.to === to
            );

        });


    busList.innerHTML = "";

    busList.style.display = "block";


    document.getElementById(
        "seat-section"
    ).style.display = "none";


    document.getElementById(
        "passenger-section"
    ).style.display = "none";


    document.getElementById(
        "confirmation-section"
    ).style.display = "none";


    if (availableBuses.length === 0) {

        busList.innerHTML = `

            <div class="bus-card">

                <h3>No buses available</h3>

                <p>
                    Sorry, no buses are available
                    for this route.
                </p>

            </div>

        `;

        return;
    }


    availableBuses.forEach(function(bus) {

        const busCard =
            document.createElement("div");


        busCard.className =
            "bus-card";


        busCard.innerHTML = `

            <h3>🚌 ${bus.name}</h3>

            <div class="bus-details">

                <div>
                    <strong>
                        ${bus.from}
                    </strong>
                    →
                    <strong>
                        ${bus.to}
                    </strong>
                </div>

                <div>
                    <strong>Departure:</strong>
                    ${bus.departure}
                </div>

                <div>
                    <strong>Arrival:</strong>
                    ${bus.arrival}
                </div>

                <div>
                    <strong>Price:</strong>
                    ₹${bus.price}
                </div>

                <div>
                    <strong>Available Seats:</strong>
                    ${bus.seats}
                </div>

                <button
                    class="select-button"
                    onclick="selectBus(${bus.id})">
                    Select
                </button>

            </div>

        `;


        busList.appendChild(busCard);

    });

}



// ==========================================
// SELECT BUS
// ==========================================

function selectBus(busId) {

    selectedBus =
        buses.find(function(bus) {

            return bus.id === busId;

        });


    if (!selectedBus) {
        return;
    }


    const date =
        document.getElementById("date").value;


    localStorage.setItem(
        "selectedBus",
        JSON.stringify(selectedBus)
    );


    localStorage.setItem(
        "travelDate",
        date
    );


    showSeats();

}



// ==========================================
// SHOW SEATS
// ==========================================

function showSeats() {

    selectedSeats = [];


    document.getElementById(
        "seat-section"
    ).style.display = "block";


    document.getElementById(
        "passenger-section"
    ).style.display = "none";


    document.getElementById(
        "confirmation-section"
    ).style.display = "none";


    document.getElementById(
        "selected-bus-info"
    ).innerHTML = `

        <h3>
            🚌 ${selectedBus.name}
        </h3>

        <p>
            ${selectedBus.from}
            →
            ${selectedBus.to}
        </p>

        <p>
            Departure:
            ${selectedBus.departure}
        </p>

        <p>
            Price per seat:
            ₹${selectedBus.price}
        </p>

    `;


    createSeats();


    document.getElementById(
        "seat-section"
    ).scrollIntoView({

        behavior: "smooth"

    });

}



// ==========================================
// CREATE SEATS
// ==========================================

function createSeats() {

    const seatLayout =
        document.getElementById(
            "seat-layout"
        );


    seatLayout.innerHTML = "";


    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        const seat =
            document.createElement(
                "button"
            );


        seat.innerText = i;

        seat.className = "seat";


        seat.onclick = function() {

            selectSeat(
                i,
                seat
            );

        };


        seatLayout.appendChild(seat);

    }

}



// ==========================================
// SELECT / DESELECT SEAT
// ==========================================

function selectSeat(
    seatNumber,
    seatElement
) {

    if (
        selectedSeats.includes(
            seatNumber
        )
    ) {

        selectedSeats =
            selectedSeats.filter(
                function(seat) {

                    return seat !== seatNumber;

                }
            );


        seatElement.classList.remove(
            "selected"
        );

    }

    else {

        selectedSeats.push(
            seatNumber
        );


        seatElement.classList.add(
            "selected"
        );

    }


    updateSeatSummary();

}



// ==========================================
// UPDATE SEAT SUMMARY
// ==========================================

function updateSeatSummary() {

    const seatDisplay =
        document.getElementById(
            "selected-seats"
        );


    const totalPrice =
        document.getElementById(
            "total-price"
        );


    if (
        selectedSeats.length === 0
    ) {

        seatDisplay.innerText =
            "None";

        totalPrice.innerText =
            "0";

    }

    else {

        seatDisplay.innerText =
            selectedSeats.join(", ");


        totalPrice.innerText =
            selectedSeats.length *
            selectedBus.price;

    }

}



// ==========================================
// CONTINUE TO PASSENGER DETAILS
// ==========================================

function continueToPassenger() {

    if (
        selectedSeats.length === 0
    ) {

        alert(
            "Please select at least one seat."
        );

        return;
    }


    document.getElementById(
        "passenger-section"
    ).style.display = "block";


    document.getElementById(
        "passenger-section"
    ).scrollIntoView({

        behavior: "smooth"

    });

}



// ==========================================
// CONFIRM BOOKING
// ==========================================

function confirmBooking() {

    const name =
        document.getElementById(
            "passenger-name"
        ).value.trim();


    const mobile =
        document.getElementById(
            "passenger-mobile"
        ).value.trim();


    const email =
        document.getElementById(
            "passenger-email"
        ).value.trim();


    if (
        name === "" ||
        mobile === "" ||
        email === ""
    ) {

        alert(
            "Please enter all passenger details."
        );

        return;
    }


    const travelDate =
        document.getElementById(
            "date"
        ).value;


    const total =
        selectedSeats.length *
        selectedBus.price;


    // Generate booking ID

    const bookingId =
        "BUS" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    // Display confirmation

    document.getElementById(
        "booking-id"
    ).innerText = bookingId;


    document.getElementById(
        "confirmation-name"
    ).innerText = name;


    document.getElementById(
        "confirmation-bus"
    ).innerText =
        selectedBus.name;


    document.getElementById(
        "confirmation-route"
    ).innerText =
        selectedBus.from +
        " → " +
        selectedBus.to;


    document.getElementById(
        "confirmation-date"
    ).innerText =
        travelDate;


    document.getElementById(
        "confirmation-seats"
    ).innerText =
        selectedSeats.join(", ");


    document.getElementById(
        "confirmation-price"
    ).innerText =
        total;


    // Hide previous sections

    document.getElementById(
        "seat-section"
    ).style.display = "none";


    document.getElementById(
        "passenger-section"
    ).style.display = "none";


    // Show confirmation

    document.getElementById(
        "confirmation-section"
    ).style.display = "block";


    document.getElementById(
        "confirmation-section"
    ).scrollIntoView({

        behavior: "smooth"

    });

}