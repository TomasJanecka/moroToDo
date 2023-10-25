import {useRecoilState} from "recoil";
import {userState} from "../../state/state";
import {Header} from "../Header";
import {Grid} from "@mui/material";

type Props = {}

export const Tasks = ({}:Props) => {
  const [user, setUser] = useRecoilState(userState);
  
  console.log(user?.tasks);
  
  return <Grid container spacing={0}>
    <Header/>
  </Grid>
}