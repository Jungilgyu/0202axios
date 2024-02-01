import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const Bell = () => {
    return (
        <Badge color='primary' variant='dot'>
            <NotificationsIcon id='bell-icon' color='info'/>
        </Badge>
    )
}

export default Bell;