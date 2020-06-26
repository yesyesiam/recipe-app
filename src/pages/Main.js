import React, {useEffect} from 'react'
import CardList from '../components/CardList'
import { useDispatch, useSelector } from 'react-redux'
import { get_recipes, getKeys, changePage } from '../store/actions/recipes'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination/Pagination'

const Main = () => {
    const dispatch = useDispatch()
    const keys = useSelector(state => state.recipes.keys)
    const recipes = useSelector(state=> state.recipes.recipesList)
    const loading = useSelector(state => state.recipes.loading)
    const currentPage = useSelector(state => state.recipes.currentPage)
    const cached = useSelector( state=> state.recipes.cached)

    const pageSize = 2

    useEffect(()=>{
        if(!cached){
            dispatch(getKeys(pageSize))
        }
        // eslint-disable-next-line
    },[])

    const getPage = (index)=>{
        dispatch(get_recipes(keys[index*pageSize], pageSize))
        dispatch(changePage(index))
    }

    return (
        <div className="container-small">
            <div className="row main">
                <div className="col s12 m5 push-m7">
                    <div className="jum">
                        <h4>Факт о еде №229</h4>
                        <p>
                            Жареный верблюд фаршируется целым бараном.
                            <br />
                            Правда, очень интересно?
                        </p>
                        <i onClick={()=> dispatch(getKeys(pageSize))} className="medium material-icons">sync</i>
                    </div>
                </div>
                <div className="col s12 m7 pull-m5">
                    {loading&&<Loader type={true}/>}
                    <CardList cards={recipes} />
                    {
                        keys.length>pageSize&&
                        <Pagination 
                            changeHandler={getPage}
                            pageCount={keys.length/pageSize}
                            currentPage={currentPage}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Main