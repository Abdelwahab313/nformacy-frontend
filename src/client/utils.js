export function convertObjectToArray(client) {
  return [
    client.uuid,
    client.name,
    client.ownerName,
    client.address,
    client.image_link,
    client.contacts,
    client.verified,
    client.created,
  ];
}
