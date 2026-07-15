export default function BottomItems({ numOfCheckedItems, length, removeFun }) {
    return (

        <div id="bottom-items">
            <div id="progress">
                <div id="progress-bar" style={{ "width": `${numOfCheckedItems / /*maybe 0*/ length * 100}%` }}></div>
                <p id="inner-text" >{numOfCheckedItems} out of {length}</p>
            </div>
            <button onClick={removeFun}>Remove Checked</button>
        </div>
    )
}