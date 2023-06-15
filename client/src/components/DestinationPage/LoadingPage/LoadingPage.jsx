import React, { useState, useCallback, useEffect } from "react";
import PercentageBar from "./PercentageBar";

import "./LoadingPage.css";

const facts = [
	"Did you know that the Great Wall of China is the longest wall in the world, stretching over 13,000 miles? It's also one of the Seven Wonders of the Medieval World.",
	"The world's oldest known city is Jericho, which is located in the West Bank and has been continuously inhabited for over 11,000 years.",
	"The world's largest desert is the Sahara, which covers an area of about 3.6 million square miles across North Africa.",
	"The Great Barrier Reef in Australia is the world's largest coral reef system, and is home to thousands of species of fish, turtles, sharks, and other marine life.",
	"Mount Everest, the highest mountain in the world, is located in the Himalayas and stands at a staggering 29,029 feet tall.",
	"The Great Wall of China is not visible from space, contrary to popular belief.",
	"The longest flight in the world is from Singapore to New York, covering a distance of 9,534 miles.",
	"The largest city in the world by population is Tokyo, Japan, with over 37 million people.",
	"The highest point in Africa is Mount Kilimanjaro, located in Tanzania, with a height of 19,341 feet.",
	"The United States has the most UNESCO World Heritage Sites, with 24 natural and cultural wonders.",
	"The world's largest cave is Son Doong Cave in Vietnam, which is over 5 miles long.",
	"The world's smallest independent country is Vatican City, which has an area of only 44 hectares (110 acres).",
	"The Great Barrier Reef in Australia is the world's largest coral reef system and home to thousands of species of marine life.",
	"Istanbul, Turkey is the only city in the world that straddles two continents - Europe and Asia.",
	"The world's largest waterfall system is the Iguazu Falls, located on the border of Argentina and Brazil.",
	"The tallest building in the world is the Burj Khalifa in Dubai, which stands at a height of 2,717 feet.",
	"The Amazon rainforest in South America is the largest tropical rainforest in the world.",
	"The coldest inhabited place on Earth is Oymyakon, Russia, where temperatures can drop as low as -90°F.",
	"The world's largest flower is the Rafflesia arnoldii, which can grow up to 3 feet in diameter.",
	"The largest salt flat in the world is the Salar de Uyuni in Bolivia, covering over 4,000 square miles.",
	"The Grand Canyon in Arizona, USA, is over 277 miles long and up to 18 miles wide.",
	"The world's oldest national park is Yellowstone National Park in the United States.",
	"The highest waterfall in the world is Angel Falls in Venezuela, with a drop of 3,212 feet.",
	"The city of Venice, Italy is built on over 100 small islands connected by canals and bridges.",
	"The world's largest natural arch is the Landscape Arch in Arches National Park, Utah, USA.",
	"The Sahara Desert in Africa is the largest hot desert in the world, covering over 3.6 million square miles.",
	"The world's deepest oceanic trench is the Mariana Trench in the Pacific Ocean, which is over 36,000 feet deep.",
	"The largest castle in the world is Prague Castle in the Czech Republic, covering over 70,000 square meters.",
	"The world's largest aquarium is the Georgia Aquarium in Atlanta, USA, which has over 10 million gallons of water.",
	"The Great Sphinx of Giza in Egypt is over 4,500 years old.",
	"The largest and most populous continent in the world is Asia, with over 4.6 billion people.",
	"The world's largest waterfall system is the Iguazu Falls, located on the border of Argentina and Brazil.",
	"The city of Petra in Jordan is an ancient city carved out of rock and is over 2,000 years old.",
	"The world's largest and deepest ocean is the Pacific Ocean, covering over 63 million square miles.",
	"The city of Barcelona in Spain has 9 UNESCO World Heritage Sites, including Gaudi's Park Guell and Sagrada Familia.",
];

const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};



const LoadingPage = ({ percentage }) => {
	const [fact, setFact] = useState("");

    const selectFact = useCallback(() => {
        const rndInt = randomIntFromInterval(0, 34);
        setFact(facts[rndInt]);
    }, []);

    useEffect(() => {
        const intervalID = setInterval(selectFact, 8000);
        return () => clearInterval(intervalID);
    }, [selectFact])

	return (
		<div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-200'>
			<div className='absolute mb-96 w-4/5 md:w-2/5 h-40 flex items-center justify-center rounded-md animate-bounce'>
				<div className='glass mx-4 p-4 '>
					<h1 className='text-2xl'>Did you know that?</h1>
					<p className=''>{fact}</p>
				</div>
			</div>
			<div className='flex flex-col items-center w-2/4 text-center'>
				<PercentageBar percentage={percentage} />
				<h1 className='text-xl animate-pulse mt-2'>Loading...</h1>
				<p className='text-md'>
					Our AI system is searching our database to provide a personalized
					recommendation based on your input. Please wait a few moments while we
					generate the best possible result for you.
				</p>
			</div>
		</div>
	);
};

export default LoadingPage;
