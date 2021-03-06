import React from 'react'
import {connect} from 'react-redux'
import {compose, withPropsOnChange} from 'recompose'
import {ListGroup} from 'react-bootstrap'
import {get} from 'lodash'

import selectors from '../../../../store/selectors'
import FoodItem from './FoodItem'

const mapStateToProps = state => ({
  getFoodCategory: selectors.food.category.getOne(state)
})

const enhance = compose(
  connect(mapStateToProps),
  withPropsOnChange(
    ['selectedCategoryId'],
    ({selectedCategoryId, getFoodCategory}) => ({
      items: get(getFoodCategory(selectedCategoryId), 'items')
    })
  )
)

const FoodItemSelector = ({
  items,
  selectedItems,
  handleItemsChange
}) =>
  <ListGroup style={{
    height: '225px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'flex-start'
  }}>
    {items && items.map(item =>
      <FoodItem
        key={item._id}
        item={item}
        selectedItems={selectedItems}
        handleItemsChange={handleItemsChange}
        className="foodItem"
      />
    )}
  </ListGroup>

export default enhance(FoodItemSelector)
