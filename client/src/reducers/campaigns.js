import {ADD_CAMPAIGN} from '../constants';

const initialState = [
  {
    // an example of a campaign
    id: 1,
    name: 'Example Campaign',
    subject: 'Subject line for an email',
    from: 'hackers@hrnyc.com',
    userId: 1, // Default
    content: 'https://', // Fill this in with a S3 URI later
  },
];

export default function campaigns(state = initialState, action) {
  switch (action.type) {
    case ADD_CAMPAIGN:
      return [
        ...state,
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        {
          id: 1,
          name: 'This is a campaign name',
          subject: 'Subject line for an email',
          from: 'hackers@hrnyc.com',
          userId: 1, // Default
          content: 'https://', // Fill this in with a S3 URI later
        },
      ];

    default:
      return state;
  }
}
