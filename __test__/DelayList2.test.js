import { render, screen } from '@testing-library/react-native';
import DelayList from '../components/DelayList';

const setDelays  = () => false;

const delays = [
    {
        ActivityId: "1500adde-0a5d-1766-08d8-d85aaae62018",
        ActivityType: "Avgang",
        AdvertisedTimeAtLocation: "2021-03-11T13:03:00.000+01:00",
        AdvertisedTrainIdent: "735",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:15:00.000+01:00",
        FromLocation: [
            {
                "LocationName": "Hpbg",
                "Priority": 1,
                "Order": 0
            }
        ],
        ToLocation: [
            {
                "LocationName": "Cst",
                "Priority": 1,
                "Order": 0
            }
        ]
    }
];


test('There should be a button with the text karta', async () => {
    const { getByText } = render(<DelayList setDelays={setDelays} delays={delays} />);
    const karta = await getByText('karta', { exact: false });
    expect(karta).toBeDefined();
});
