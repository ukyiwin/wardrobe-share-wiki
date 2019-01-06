const initialState = { menu: [], error: false };

function pagesReducer(state, action) {
  switch (action.type) {
    case 'CREATE_PAGE':
      return [...state, { id: action.payload.id, title: action.payload.title }];

    case 'UPDATE_PAGE': {
      const i = state.findIndex(el => el.id === action.payload.id);
      return [
        ...state.slice(0, i),
        { ...state[i], title: action.payload.title },
        ...state.slice(i + 1)
      ];
    }

    case 'DELETE_PAGE': {
      const i = state.findIndex(el => el.id === action.payload.id);
      return [...state.slice(0, i), ...state.slice(i + 1)];
    }
    default:
      return initialState;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;

    case 'LOAD_MENU':
      return { menu: action.payload.menu };

    case 'CREATE_SPACE':
      return {
        ...state,
        menu: [
          ...state.menu,
          {
            space_title: action.payload.space_title,
            space_id: action.payload.space_id,
            pages: []
          }
        ]
      };

    case 'UPDATE_SPACE': {
      const i = state.menu.findIndex(
        el => el.space_id === action.payload.space_id
      );
      return {
        ...state,
        menu: [
          ...state.menu.slice(0, i),
          { ...state.menu[i], ...action.payload },
          ...state.menu.slice(i + 1)
        ]
      };
    }

    case 'DELETE_SPACE': {
      const i = state.menu.findIndex(
        el => el.space_id === action.payload.space_id
      );
      return {
        ...state,
        menu: [...state.menu.slice(0, i), ...state.menu.slice(i + 1)]
      };
    }

    case 'CREATE_PAGE':
    case 'UPDATE_PAGE':
    case 'DELETE_PAGE': {
      const i = state.menu.findIndex(
        el => el.space_id === action.payload.space_id
      );
      return {
        ...state,
        menu: [
          ...state.menu.slice(0, i),
          {
            ...state.menu[i],
            pages: pagesReducer(state.menu[i].pages, action)
          },
          ...state.menu.slice(i + 1)
        ]
      };
    }

    default:
      return initialState;
  }
};
export { reducer, initialState };
