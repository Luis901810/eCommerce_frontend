import { Box } from "@mui/system";
import Carousel from './Carousel'
import CardShoe from "../Card/Card";

const Landing = () => {
        return (
            <Box sx={{display: 'flex', flexDirection:"column", justifyContent: 'center'}} >
                <Carousel/>
                <CardShoe/>
            </Box>
            

            
        );
    };

export default Landing;