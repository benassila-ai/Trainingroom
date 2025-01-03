import { createAsyncAction } from 'typesafe-actions';
import { Member } from '../../typings';

export const loadMembersAction = createAsyncAction(
    'members/load/pending',
    'members/load/fulfilled',
    'members/load/rejected'
)<void, Member[], void >();

export const saveMemberAction = createAsyncAction(
    'profile/save/pending',
    'profile/save/fulfilled',
    'profile/save/rejected'
)<Member, Member, string>();