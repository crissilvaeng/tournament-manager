import { Test, TestingModule } from '@nestjs/testing';
import { TournamentDto } from './dto/tournament.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentsController } from './controllers/tournaments.controller';
import { MockTournamentsService } from './services/mocktournaments.service';

describe('AppController', () => {
  let tournamentsController: TournamentsController;
  let tournamentsService: MockTournamentsService;
  const result = new Promise<TournamentDto>((resolve, reject) => {
    const tournament: TournamentDto = {
      slug: '1',
      title: 'tournament test',
      description: 'description',
      startTime: new Date(),
      status: 'open',
    };
    resolve(tournament);
    reject();
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TournamentsController],
      providers: [
        {
          provide: 'ITournamentsService',
          useClass: MockTournamentsService,
        },
        MockTournamentsService,
      ],
    }).compile();

    tournamentsController = app.get<TournamentsController>(
      TournamentsController,
    );
    tournamentsService = app.get<MockTournamentsService>(
      MockTournamentsService,
    );
  });

  describe('TournamentsController', () => {
    it('should create tournament', async () => {
      const tournamentTest: CreateTournamentDto = {
        title: 'tournament test',
        description: 'description',
        startTime: new Date(),
      };
      jest.spyOn(tournamentsService, 'create').mockImplementation(() => result);
      expect(tournamentsController.create(tournamentTest)).toStrictEqual(
        result,
      );
    });

    it('should return an Array of tournament', async () => {
      const resultArray = new Promise<TournamentDto[]>((resolve, reject) => {
        const tournament: [TournamentDto] = [
          {
            slug: '1',
            title: 'tournament test',
            description: 'description',
            startTime: new Date(),
            status: 'open',
          },
        ];
        resolve(tournament);
        reject();
      });
      jest
        .spyOn(tournamentsService, 'findAll')
        .mockImplementation(() => resultArray);
      expect(tournamentsController.findAll()).toStrictEqual(resultArray);
    });

    it('should return a tournament', async () => {
      jest
        .spyOn(tournamentsService, 'findOne')
        .mockImplementation(() => result);
      expect(tournamentsController.findOne('1')).toStrictEqual(result);
    });
  });
});
