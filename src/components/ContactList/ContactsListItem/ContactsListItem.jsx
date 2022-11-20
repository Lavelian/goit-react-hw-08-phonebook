import { ListItem, Text, Button } from '@chakra-ui/react';
import { Loader } from 'components/allComponents';
import { useRemoveContactsMutation } from 'redux/contactsApi/contactsApi';

export default function ContactsListItem({ name, number, id }) {
  const [removeContact, { isLoading }] = useRemoveContactsMutation();
  return (
    <ListItem alignItems="center" w={[300, 300, 300, 300, 350]} display="flex">
      <Text mr="auto">{name + ' : ' + number} </Text>
      <Button
        type="button"
        onClick={() => removeContact(id)}
        disabled={isLoading}
      >
        {isLoading ? <Loader height={17} width={17} /> : 'Delete'}
      </Button>
    </ListItem>
  );
}
