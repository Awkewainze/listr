import React from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';
import AppCSSTransition from '../common/AppCSSTransition';
import ListItem from './item/ListItem';
import { reorderItem } from '../../redux/actions/list';

const DragDropList = ({
  items,
  listId,
  onDelete,
  onCheck
}) => {
  const dispatch = useDispatch();

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    dispatch(reorderItem(listId, draggableId, source, destination));
    // TODO update order of drag/drop items
    // TODO has to happen synchronously??? That seems... bad
    // TODO I wonder how this will work synchronously... w/ redux underneath as well
    // TODO might have to flip order of activeList and DragAndDrop, or combine the two
  };

  return (
    <DragDropContext
      // onDragStart={() => {}}
      // onDragUpdate={() => {}}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={listId}>
        {provided => (
          <List {...provided.droppableProps} innerRef={provided.innerRef}>
            {items.map((item, i) =>
              <AppCSSTransition key={item.id} prefix="ListItem" timeout={200}>
                <ListItem
                  key={item.id}
                  item={item.text}
                  checked={item.checked}
                  onDelete={onDelete}
                  index={i}
                  itemId={item.id}
                  onCheck={onCheck}
                />
              </AppCSSTransition>
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;