import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByID } from "../../services/Dashboard";



export default function DetailUsers() {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async()=>{
            const user = await getUserByID() 
        }
    },[])
}