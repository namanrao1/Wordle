import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';

function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:3000/leaderboard');
                setLeaderboardData(response.data); // Assuming the response data is an array of player objects
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.log(err);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div className="container mt-5"><h2 className="text-center mb-4">Loading...</h2></div>;
    }

    if (error) {
        return <div className="container mt-5"><h2 className="text-center mb-4">Error loading leaderboard</h2></div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Leaderboard</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((player, index) => (
                            <tr key={player._id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaderBoard;
