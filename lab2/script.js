function getDate()
{
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const currDate = new Date();

    return months[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();
}

function getTime()
{
    const currDate = new Date();
    hours = currDate.getHours();
    hours = document.getElementById("format").value == "12" ? hours % 12 : hours;

    return hours + ":" + currDate.getMinutes();
}

function showTimeAlert()
{
    alert(getDate() + "\n" + getTime());
}

function showTimePage()
{
    document.getElementById('pageTimeText').innerHTML = getDate() + "\n" + getTime();
}
