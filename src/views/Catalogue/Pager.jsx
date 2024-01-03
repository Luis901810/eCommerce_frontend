import { useDispatch, useSelector } from "react-redux"
import style from "./Pager.module.css"
import { NUM_SHOES_PER_PAGE } from "../../utils/constants"
import { changePage } from "../../redux/actions"


function Pager(props) {
    const page = useSelector(state => state.page)
    const totalButtons = Math.ceil(props.numShoes/NUM_SHOES_PER_PAGE)
    const dispatch = useDispatch()
    const numButtons = []
    for(let i=1; i<=totalButtons;i++){
        numButtons.push(i)
    }
    let pagesBefore = numButtons.filter(element => element<page)
    let pagesAfter = numButtons.filter(element => element>page)
    
    const changePagePager = (newPage)=>{
        newPage>=1&&newPage<=totalButtons?dispatch(changePage(Number(newPage))):null
    
      }

    return(
        <div className={style.pagerContainer}>
            {page !== numButtons[0] ? <button className={style.nextPrevButtons} onClick={()=>changePagePager(page-1)}>Prev</button>:null}

            {pagesBefore.length>3? <button className={style.numberBbutton} value={pagesBefore[0]} onClick={(event)=>changePagePager(event.target.value)}>{pagesBefore[0]}</button>:null}
            {pagesBefore.length>4? <button className={style.numberBbutton}>...</button>:null}
            
            {pagesBefore.slice(-3).map((element, index) => <button key={index} className={style.numberBbutton} onClick={(event)=>changePagePager(event.target.value)} value={element}>{element}</button>)}

            <button className={style.current}>{page}</button>

            {pagesAfter.slice(0,3).map((element, index) => <button  key={index} className={style.numberBbutton} onClick={(event)=>changePagePager(event.target.value)} value={element}>{element}</button>)}

            {pagesAfter.length>4? <button className={style.numberBbutton}>...</button>:null}

            {pagesAfter.length>3? <button className={style.numberBbutton} value={pagesAfter.slice(-1)} onClick={(event)=>changePagePager(event.target.value)}>{pagesAfter.slice(-1)}</button>:null}

            {page !== numButtons.slice(-1)[0] ? <button className={style.nextPrevButtons} onClick={()=>changePagePager(Number(page) + 1 )}>Next</button>:null}
        </div>
    )
}

export default Pager