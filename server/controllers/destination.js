require("dotenv").config();

const {Configuration, OpenAIApi} = require('openai')
const fetch = require("node-fetch");



const getDestinationInfo = async (req, res) => {
    try {
        const openAi = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        }))
        console.log('Received: ', req.body)
        const travelParameters = `With this json object, plan my trip including names and links to external resources (like websites, and images or videos), and format it on json too
        make sure that the json object contains the next (IMPORTANT, ONLY RETURN A JSON OBJECT, all json property names must be lowercaps):
        - Name of the destination (must be a location name), state, country, country code (ISO 3166), description, nearest airport, coordinates (json property called coordinates, with a json object with latitude and longitude), best months to travel in (json key has to be named best_months_to_travel_in, it has to be an array with string of the months), local currency, timezone, and website (ALL THIS INFORMATION MUST BE INSIDE OF Destination PROPERTY).
        - Current location, including name, nearest airport, country.
        - The dates (json value has to be a string) in format of DD/MM - DD/MM (if user doesn't specify a date, recommend the best dates for the destination).
        - The budget, including currency in the local currency from the users country (If user doesn't specify a budget, put an average budget).
        - At least 3 different options for accomodations (IMPORTANT json key has to be named accomodations WITH JUST ONE M BETWEEN THE O'S), and each accomodation includes the name, place, website, star rating and average night cost (json key has to be named average_night_cost) with currency.
        - At least 3 different options to get from current location to destination (json property has to be named transportation_to_destination), like plane tickets, ships, or any other type, and each option includes the name, type, website, and cost with currency.
        - At least 2 types of transportation locally (json property has to be named local_transportation), and each transportation includes, the type, and a website.
        - At least 6 different activities (json property has to be named activities), and each activity includes the name, type, short description, start cost (json property has to be named amount) with currency, estimated duration in hours (json property has to be named duration, value has to be only a number), place, reviews, number of stars, and a website.
        - Group style.
        - Travel style. 
        : ${JSON.stringify(req.body)}`
        
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: travelParameters}],
        })
        const data = await JSON.parse(response.data.choices[0].message.content)
        console.log(data)

        const unsplash_access = process.env.UNSPLASH_KEY
        const images = await fetch(`https://api.unsplash.com/search/photos/?query=${data.destination.name.toLowerCase().split(' ').join('-')}&page=1&per_page=4&client_id=${unsplash_access}`)
        const imagesResponse = await images.json()
        console.log(imagesResponse)
        data.destination.images = imagesResponse.results
        
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


module.exports = { getDestinationInfo }