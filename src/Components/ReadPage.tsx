import { useState } from "react";
import { doc, getDoc, setDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ReadPage = () => {

    const getPlayerInputFromServer = () => {
        
        const currPlayerId = localStorage.getItem("playerName"); 
    }; 
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Enter Your Prompt!</h1>



      </div>
    </div>

    );
};

export default ReadPage; 
