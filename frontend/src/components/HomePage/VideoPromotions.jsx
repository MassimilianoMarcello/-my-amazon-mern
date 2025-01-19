import { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoPromotions.css';

const VideoPromotions = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`  ${apiUrl}/videos/promotions`);
                setVideos(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="video-promotions">
            <h2>Video Promotions</h2>
            <div className="videos-grid">
                {videos.map(video => (
                    <div key={video._id} className="video-card">
                        <video controls>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoPromotions;