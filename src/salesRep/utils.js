export function convertObjectToArray(user) {
  return [
    user.uuid,
    user.first_name,
    user.last_name,
    `${user.first_name} ${user.last_name}`,
    user.phone_number,
    user.national_id,
    user.username,
    user.date_joined,
  ];
}
