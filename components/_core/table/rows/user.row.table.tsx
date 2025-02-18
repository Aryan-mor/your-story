import UserBadge, { type UserBadgeProps } from '../../user/badge.user';

export default function UserRowTable({
  user,
  userBadgeProps,
}: {
  user: User;
  userBadgeProps?: undefined | Omit<UserBadgeProps, 'userId'>;
}) {
  return {
    value: user.firstname + ' ' + user.lastname,
    children: (
      <UserBadge
        variant="light"
        {...userBadgeProps}
        userImageProps={{
          size: 'sm',
          ...userBadgeProps?.userImageProps,
        }}
        userId={user.id}
      />
    ),
  };
}
