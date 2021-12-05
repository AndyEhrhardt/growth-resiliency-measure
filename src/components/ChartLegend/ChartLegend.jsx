import React from 'react';
import Typography from "@mui/material/Typography";

function ChartLegend() {
    return (
        <div className="legend-container">
            <Typography
                sx={{ fontWeight: 500, fontSize: 23, fontFamily: "roboto", textAlign: 'left' }}
            >
                Legend
                <Typography
                    sx={{ fontWeight: 400, fontSize: 16, fontFamily: "roboto", textAlign: 'left' }}
                >
                    <b>Self-Confidence:</b> trust in one’s abilities, capacities, and judgment.
                </Typography>
                <Typography
                    sx={{ fontWeight: 400, fontSize: 16, fontFamily: "roboto", textAlign: 'left' }}
                >
                    <b>Self-Expression:</b> free expression of one’s feelings, impulses, thoughts, attitudes, and talents.
                </Typography>
                <Typography
                    sx={{ fontWeight: 400, fontSize: 16, fontFamily: "roboto", textAlign: 'left' }}
                >
                    <b>Persistence:</b>  persistence in doing something despite difficulty or delay in achieving success.
                </Typography>
                <Typography
                    sx={{ fontWeight: 400, fontSize: 16, fontFamily: "roboto", textAlign: 'left' }}
                >
                    <b>Success Under Pressure:</b> accomplishment through an opposing situation/obstacle
                </Typography>
                <Typography
                    sx={{ fontWeight: 400, fontSize: 16, fontFamily: "roboto", textAlign: 'left' }}
                >
                    <b>Ask For Help:</b> willingness to request to see/talk to someone for help
                </Typography>
            </Typography>
        </div>
    );
}

export default ChartLegend;