import { types } from "./actions";

const initialState = {
  userInfo: {},
  status: true,
  otherUserInfo: {},
  otherFollow: {
    followers: 0,
    followings: 0,
  },
  userFollow: {
    followers: 0,
    followings: 0,
  },
};

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.PROFILE_INFO:
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.GET_USER_INFO:
      return {
        ...appState,
        userInfo: { ...payload },
        userFollow: {
          followers: payload.followers,
          followings: payload.followings,
        },
      };
    case types.SET_USER_INFO:
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.GET_AVATAR_URL:
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.NOT_PROFILE_FOUND:
      return { ...appState, status: false };
    case types.PROFILE_FOUND:
      return {
        ...appState,
        status: true,
        otherUserInfo: { ...payload },
        otherFollow: {
          followers: payload.followers,
          followings: payload.followings,
        },
      };
    case types.PROFILE_BACKGROUND_UPDATE:
      return { ...appState, userInfo: { ...payload } };
    case types.FOLLOW_UPDATED:
      return { ...appState, otherFollow: { ...payload } };

    case types.UNFOLLOW_UPDATED:
      const newOtherFollower = appState.otherFollow.followers.filter((item) => {
        return item.id !== payload.follower.id;
      });
      const followings = appState.otherFollow.followings;
      return {
        ...appState,
        otherFollow: {
          followings,
          followers: newOtherFollower,
        },
      };
    default:
      return appState;
  }
};

export const getProfile = (state) => state.users.userInfo;
