class Time
{
    constructor(hour, minutes)
    {
        this.hour = hour;
        this.minutes = minutes;
    }

    getHours()
    {
        return this.hour;
    }

    getMinutes()
    {
        return this.minutes;
    }

    print()
    {
        let min;
        if (this.minutes === 0)
        {
            min = "00";
        } else
        {
            min = this.minutes;
        }
        return this.hour + ":" + min;
    }
}

export default Time;
