class DataToAdd
{

    constructor()
    {
        this.column = "";
        this.records = [];
    }

    addColumnName = name =>
    {
        this.column = name;
    };

    //id is a row
    addData = (id, data) =>
    {
        //console.log(id, data);
        if (data === "-") return;

        let found = false;
        for (let elem of this.records)
        {
            if (elem.id === id)
            {
                if (data === "")
                {
                    this.records = this.records.filter(elem => elem.id !== id);
                } else
                {
                    elem.data = data;
                }

                found = true;
                break;
            }
        }

        if (!found)
        {
            this.records.push({id: id, data: data});
        }
    };
}

export default DataToAdd;
