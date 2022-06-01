import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { render } from '@testing-library/react-native';
import DelayMap from '../components/DelayMap';


const delay = [
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

const route = {
    params: {
        station: "Stockholm C",
        date: "2020-01-01",
        time:"10:10:01",
        delay: delay
    }
}

test('Two headers should exist containing text E-post and Lösenord', async () => {
    render(<DelayMap route={route} />);
});
