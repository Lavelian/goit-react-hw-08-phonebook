import { List } from '@chakra-ui/react';
import { ContactsListItem } from 'components/allComponents';
import { useGetContactsQuery } from 'redux/contactsApi/contactsApi';
import { useSelector } from 'react-redux';

export default function ContactList() {
  const { data: contacts = [] } = useGetContactsQuery();

  const filter = useSelector(({ filter }) => filter);
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <List display="flex" flexDirection="column" rowGap={3}>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactsListItem key={id} id={id} name={name} number={number} />
      ))}
    </List>
  );
}
//kfkfkfkf