import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Custom marker icon
const createCustomIcon = (status) => {
    const color = status === 'available' ? '#28A745' : status === 'claimed' ? '#ffc107' : '#6c757d'

    return L.divIcon({
        className: 'custom-marker-wrapper',
        html: `
      <div style="
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: bounce 0.5s ease;
      ">
        <span style="color: white; font-size: 12px;">🍽️</span>
      </div>
    `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    })
}

function BounceMarkers({ donations, onClaim }) {
    const map = useMap()

    useEffect(() => {
        if (donations.length > 0) {
            const bounds = L.latLngBounds(
                donations.map(d => [d.location?.lat || 40.7128, d.location?.lng || -74.006])
            )
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [donations, map])

    return (
        <>
            {donations.map((donation, index) => (
                <Marker
                    key={donation.id}
                    position={[donation.location?.lat || 40.7128, donation.location?.lng || -74.006]}
                    icon={createCustomIcon(donation.status)}
                >
                    <Popup>
                        <div className="marker-popup">
                            <h4>{donation.foodName}</h4>
                            <p><strong>Quantity:</strong> {donation.quantity}</p>
                            <p><strong>Address:</strong> {donation.location?.address || 'Not specified'}</p>
                            <p><strong>Status:</strong> <span style={{ textTransform: 'capitalize' }}>{donation.status}</span></p>
                            {donation.status === 'available' && onClaim && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onClaim(donation.id)}
                                    style={{ marginTop: '8px', width: '100%' }}
                                >
                                    Claim Now
                                </button>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

function MapView({ donations, onClaim }) {
    const defaultCenter = [40.7128, -74.006] // NYC

    return (
        <div className="map-container">
            <MapContainer
                center={defaultCenter}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <BounceMarkers donations={donations} onClaim={onClaim} />
            </MapContainer>
        </div>
    )
}

export default MapView
