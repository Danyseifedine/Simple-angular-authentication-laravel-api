import { Component } from '@angular/core';
import { DataService } from '../../core/services/api/data.service';
import { ShowToast } from '../../shared/utils/toast';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  question: string = '';
  loading = false;

  constructor(private dataService: DataService, private showToast: ShowToast) { }

  submitQuestion(): void {

    this.loading = true;

    this.dataService.sendQuestionRequest({ question: this.question }).pipe(finalize(() => this.loading = false)).subscribe(
      _ => this.showToast.success('Question submitted'),
      _ => this.showToast.error('Something went wrong')
    );
    this.question = '';
  }
}
