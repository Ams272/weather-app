let base = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a35a2aa3bcdb14f165b47ddb90d7e08'

const getCity = async () => {
    const response = await fetch(base);
    const data = await response.json;

    return data[0];
}

getCity()
    .then(data => console.log(data))
    .catch(err => console.log(err));