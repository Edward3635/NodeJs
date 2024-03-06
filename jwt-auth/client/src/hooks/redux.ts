import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { ReducersState,AppDispatch } from '../redux/store';

export const useAppDisptach = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducersState> = useSelector;