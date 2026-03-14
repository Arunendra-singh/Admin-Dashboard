import Button from "../Button";

const MoveProductToOtherWishlist = ({ productdata, multiWishlistNames, moveProducttoDifferentList }) => (
    <div className="multiWishlistNames">
        <Button buttonClassName="ddButton" label="Move to" />
        <div className="dropdownList">
            {multiWishlistNames.map((name) => <div key={name} className="names d-block" onClick={() => moveProducttoDifferentList(name, productdata)}>{name}</div>)}
        </div>
    </div>
);

export default MoveProductToOtherWishlist;
