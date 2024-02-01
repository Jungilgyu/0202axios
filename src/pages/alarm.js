//알림페이지
import AlarmList from '../components/Alarm/AlarmList';
import { Container } from "@mui/material";


const alarm = () => {
    return (
        <Container id='alarm-page'>
            <AlarmList/>
        </Container>
    );
};

export default alarm;