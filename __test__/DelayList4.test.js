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
                "LocationName": "Apn",
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
    },
    {
        ActivityId: "1500adde-0a5d-1766-08d8-d85a927d1a39",
        ActivityType: "Avgang",
        AdvertisedTimeAtLocation: "2021-03-11T13:07:00.000+01:00",
        AdvertisedTrainIdent: "233",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:44:00.000+01:00",
        FromLocation: [
            {
                "LocationName": "Any",
                "Priority": 1,
                "Order": 0
            }
        ],
        ToLocation: [
            {
                "LocationName": "Nr",
                "Priority": 1,
                "Order": 0
            }
        ]
    }
];


test('There should be two delay cards rendered with train number 735 and 233', async () => {
    const { getByText } = render(<DelayList setDelays={setDelays} delays={delays} />);
    const train1 = await getByText('735', { exact: false });
    const train2 = await getByText('233', { exact: false });
    expect(train1).toBeDefined();
    expect(train2).toBeDefined();
});
