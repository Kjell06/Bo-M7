    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const calendarGrid = document.getElementById('calendarGrid');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();


    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = getMonthName(i);
        monthSelect.appendChild(option);
    }

    const currentYearNum = currentDate.getFullYear();
    for (let i = currentYearNum - 20; i <= currentYearNum + 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    renderCalendar(currentMonth, currentYear);

    function renderCalendar(month, year) {

        calendarGrid.innerHTML = '';

        monthSelect.value = month;
        yearSelect.value = year;

        const firstDayOfMonth = new Date(year, month, 1);
        const startingDayOfWeek = firstDayOfMonth.getDay();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
        let prevMonthDay = lastDayOfPrevMonth - startingDayOfWeek + 1;
        for (let i = 1; i < startingDayOfWeek; i++) {
            const day = document.createElement('div');
            day.textContent = prevMonthDay;
            day.classList.add('grid-item', 'prev-month');
            calendarGrid.appendChild(day);
            prevMonthDay++;
        }


        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            day.classList.add('grid-item');
            calendarGrid.appendChild(day);
        }


        let nextMonthDay = 1;
        while (calendarGrid.children.length % 7 !== 0) {
            const day = document.createElement('div');
            day.textContent = nextMonthDay;
            day.classList.add('grid-item', 'next-month');
            calendarGrid.appendChild(day);
            nextMonthDay++;
        }
    }

    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    monthSelect.addEventListener('change', function() {
        currentMonth = parseInt(monthSelect.value);
        renderCalendar(currentMonth, currentYear);
    });

    yearSelect.addEventListener('change', function() {
        currentYear = parseInt(yearSelect.value);
        renderCalendar(currentMonth, currentYear);
    });

    function getMonthName(month) {
        const months = [
            'januari', 'februari', 'maart', 'april', 'mei', 'juni',
            'juli', 'augustus', 'september', 'oktober', 'november', 'december'
        ];
        return months[month];
    }
