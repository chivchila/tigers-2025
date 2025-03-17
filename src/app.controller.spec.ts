import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './services/db-service';
import { Customer, Cat } from '../shared/types';
import { DataService } from './services/data-service/index';

describe('AppController', () => {
  let appController: AppController;
  let dbServiceMock: jest.Mocked<DBService>;

  const mockedCats: Cat[] = [
    {
      name: 'Whiskers',
      subscriptionActive: true,
      breed: 'Siamese',
      pouchSize: 'A',
    },
    {
      name: 'Fluffy',
      subscriptionActive: true,
      breed: 'Persian',
      pouchSize: 'B',
    },
    {
      name: 'Mittens',
      subscriptionActive: true,
      breed: 'Maine Coon',
      pouchSize: 'C',
    },
  ];

  const mockCustomer1: Customer = {
    id: 'userABCDEF19349593',
    firstName: 'James',
    lastName: 'Wise',
    email: 'cat3kdkf@email.com',
    cats: mockedCats,
  };

  const mockCustomer2: Customer = {
    id: 'userDEFGHI29483984',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@email.com',
    cats: [
      {
        name: 'Tiger',
        subscriptionActive: true,
        breed: 'Bengal',
        pouchSize: 'D',
      },
    ],
  };

  const mockCustomer3: Customer = {
    id: 'userDEFGHI3333333',
    firstName: 'Tom',
    lastName: 'Johnson',
    email: 'Tom@email.com',
    cats: [
      {
        name: 'Tiger',
        subscriptionActive: false,
        breed: 'Bengal',
        pouchSize: 'D',
      },
      {
        name: 'Lion',
        subscriptionActive: true,
        breed: 'Superbreed',
        pouchSize: 'F',
      },
      {
        name: 'Panther',
        subscriptionActive: true,
        breed: 'Best',
        pouchSize: 'D',
      }
    ],
  };


  beforeEach(async () => {
    dbServiceMock = {
      getCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      readFile: jest.fn()
    };

    // Mock the getCustomers method to return an array of customers
    dbServiceMock.getCustomers.mockImplementation(() => [mockCustomer1, mockCustomer2]);

    // Mock the getCustomerById method to return specific customers by their ID
    dbServiceMock.getCustomerById.mockImplementation((id: string) => {
      if (id === 'userABCDEF19349593') {
        return mockCustomer1;
      } else if (id === 'userDEFGHI29483984') {
        return mockCustomer2;
      } else if (id ==="userDEFGHI3333333") {
        return mockCustomer3;
      }
      return undefined; // If no match, return undefined
    });

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        DataService,
        {
          provide: DBService,
          useValue: dbServiceMock, // Provide the mock version of DBService
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toEqual('Hello World!');
    });

    it('should return correctly calculated information for a customer with 3 cats', () => {
      let userId = "userABCDEF19349593";
      expect(appController.getNextDelivery(userId)).toEqual( {
        "message": "Hey James! In two days' time, we'll be charging you for your next order for Whiskers, Fluffy and Mittens's fresh food.",
        "title": "Your next delivery for Whiskers, Fluffy and Mittens",
        "totalPrice": 177.75,
        "freeGift": true
      });
    });

    it('should return correctly calculated information for a customer with 1 cat', () => {
      let userId = "userDEFGHI29483984";
      expect(appController.getNextDelivery(userId)).toEqual( {
        "message": "Hey Alice! In two days' time, we'll be charging you for your next order for Tiger's fresh food.",
        "title": "Your next delivery for Tiger",
        "totalPrice": 66,
        "freeGift": false
      });
    });

    it('should return correctly calculated information for a customer with 2 active cats, one being inactive', () => {
      let userId = "userDEFGHI3333333";
      expect(appController.getNextDelivery(userId)).toEqual( {
        "message": "Hey Tom! In two days' time, we'll be charging you for your next order for Lion and Panther's fresh food.",
        "title": "Your next delivery for Lion and Panther",
        "totalPrice": 137.25,
        "freeGift": true
      });
    });
  });
});
