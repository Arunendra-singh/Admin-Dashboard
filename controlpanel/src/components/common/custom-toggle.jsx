export default function CustomToggle({ activeOn, onToggleChange }) {
    return (
        <div className="toggle-button">
            <label htmlFor={activeOn} className={`slider ${activeOn ? "on" : "off"}`}>
                <input type="checkbox" checked={activeOn} onChange={onToggleChange} aria-label="toggleButton" />
                <div className="sort clsProduct_ActiveInactiveToggleNew" />
            </label>
        </div>
    );
}
