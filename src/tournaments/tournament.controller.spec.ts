import { Test, TestingModule } from '@nestjs/testing';
import { TournamentDto } from './dto/tournament.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { TasksModule } from '../tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './entities/tournament.entity';
import { TournamentsController } from './tournaments.controller';
import { MockTournamentsService } from './mocktournaments.service';
import { TournamentsScheduler } from './tournaments.scheduler';


describe('AppController', () => {
  let tournamentsController: TournamentsController;
  let tournamentsService: MockTournamentsService;
  const result = new Promise<TournamentDto>((resolve, reject) => {
    const tournament: TournamentDto = {'slug': '1', 'title': 'tournament test', 'description': 'description', 'startTime': new Date(), 'status': 'open'}
  resolve(tournament)
});

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
  controllers: [TournamentsController],
  providers: [{
    provide: 'ITournamentsService',
    useClass: MockTournamentsService
  },MockTournamentsService],
    }).compile();

    tournamentsController = app.get<TournamentsController>(TournamentsController);
    tournamentsService = app.get<MockTournamentsService>(MockTournamentsService);
    
  });

  describe('TournamentsController', () => {
    it('should return tornament', async () => {
      
    const tournamentTest: CreateTournamentDto = {'title': 'tournament test', 'description': 'description', 'startTime': new Date()}
    jest.spyOn(tournamentsService, 'create').mockImplementation(() => result);
    expect(tournamentsController.create(tournamentTest)).toStrictEqual(result);
    });
  });
});
