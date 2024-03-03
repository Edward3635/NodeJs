import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch } from './../../../../rtk_react_advanced/src/store/store';
import { ReducersState } from '../redux/store';

export const useAppDisptach = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducersState> = useSelector;