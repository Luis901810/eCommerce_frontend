
import CardShoe from "../../components/Card/Card";
import { Box, Grid } from "@mui/material";

function ShoeList({products}) {
    return(
        <Box
        sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}>
            <Box sx={{ width: "90%", marginBottom: "40px" }}>
                <Grid container spacing={2}>
                    {products.map((product, i)=>(
                        <Grid item key={i} xs={12} sm={6} md={4} lg={2} xl={2}>
                            <CardShoe product={product}/>
                        </Grid>
                    )
                        
                    )} 
                </Grid>
            </Box>

        </Box>
    )
}

export default ShoeList;
