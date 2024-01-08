import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByID } from "../../services/Dashboard";
import { useNavigate } from "react-router-dom";
import { Card,CardMedia, Typography, CardContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LinkNoDeco } from "../../styles/ComponentStyles";



export default function DetailUsers() {
    const { id } = useParams();
    console.log(id)
    const [User, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(()=>{
        const getUser = async()=>{
            try{
            const user = await getUserByID(id)
            setUser(user)
            setIsLoading(false);
            } catch(error){
                console.log(error)
                navigate('/Admin')
            } 
        }
        getUser()
    },[id])

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (!User) {
        return <h1>Usuario no Encontrado</h1>;
    }

    return(
        <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999",
      }}
    >
      <div>
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                height="140"
                image={User.profilePicture}
            />
            <CardContent
            sx={{
                backgroundColor:"orange",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Typography
                variant="h6"
                sx={{ color: "black", textAlign: "center" }}
            >
                Nombre: {User.name}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Email: {User.email}
            </Typography>         
            <Typography
                variant="div"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Genero: {User.gender}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Estado: {User.state}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Rol : {User.role}
            </Typography>
            </CardContent>
        </Card>
        <LinkNoDeco to="/Admin">
          <CloseIcon/>
        </LinkNoDeco> 
       </div>
    </div>     
    )
}