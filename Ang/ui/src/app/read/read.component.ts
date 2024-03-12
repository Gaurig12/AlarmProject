import { Component, OnInit  } from '@angular/core';
import { Alarm } from '../app.model';
import { AlarmService } from '../data.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class AlarmComponent  implements OnInit {
  alarms: Alarm[] = []; // Initialize with an empty array
  selectedAlarm: Alarm | null = null; // Initialize selectedAlarm as null
  originalAlarm: Alarm | null = null; // Store the original state of the selected alarm
  showEditForm = false;
  isDeleteConfirmationOpen: boolean = false;
  selectedAlarmForDelete: any;
  showFilterOptions: boolean = false;
  selectedPriority: string = '';
  originalAlarms: Alarm[] = []; // Store the original list of alarms
  hoveredAlarm: Alarm | null = null;
  priorities: string[] = ['All', 'P1', 'P2', 'P3']; // List of priorities including "All"

  constructor(private AlarmService: AlarmService) { }
showDetails: boolean = true; // Initialize to show details by default
showEditView: boolean = false; // Initialize to hide edit form view by default

toggleShowEditView(): void {
  this.showEditView = !this.showEditView;
}
  ngOnInit(): void {
    this.loadAlarms();
  }

  loadAlarms(): void {
    this.AlarmService.getAlarms().subscribe(
      (alarms: Alarm[]) => {
        this.alarms = alarms;
        this.originalAlarms = [...alarms]; // Store the original alarms
        console.log('Alarms:', alarms); // Add a console.log statement to check if alarms are received
      },
      (error) => {
        console.error('Error loading alarms:', error);
      }
    );
  }
  

  editAlarm(alarm: Alarm): void {
    this.selectedAlarm = alarm;
    // this.showEditForm = false; // Close edit form when selecting a new alarm
    this.originalAlarm = { ...alarm };
  }
  onMouseEnter(alarm: Alarm): void {
    this.hoveredAlarm = alarm;
  }

  onMouseLeave(): void {
    this.hoveredAlarm = null;
  }

  toggleEditForm(alarm: any): void {
    this.showEditForm = !this.showEditForm;
  }

  submitEditForm(): void {
    if (this.selectedAlarm) {
      const scrollPosition = window.pageYOffset;
      this.AlarmService.updateAlarm(this.selectedAlarm).subscribe(
        (updatedAlarm: Alarm) => {
          const index = this.alarms.findIndex(a => a.id === updatedAlarm.id);
          if (index !== -1) {
            this.alarms[index] = updatedAlarm;
          }
          console.log('Alarm updated successfully');
          alert('RECORD UPDATED');
          this.selectedAlarm = null;
          this.showEditForm = false;
          if (this.alarms.length > 0) {
            this.selectedAlarm = this.alarms[0];
          }
          window.scrollTo(0, scrollPosition); // Maintain scroll position
        },
        (error) => {
          console.error('Error updating alarm:', error);
        }
      );
    }
  }
  // cancelEdit(): void {
  //   // Check if any changes were made to the selected alarm
  //   if (this.selectedAlarm && this.originalAlarm) {
  //     const index = this.alarms.findIndex(a => a.id === this.selectedAlarm.id);
  //     if (index !== -1) {
  //       // If changes were made, revert back to the original state
  //       this.alarms[index] = { ...this.originalAlarm };
  //     }
  //   }
  //   this.selectedAlarm = null;
  //   this.originalAlarm = null;
  // }
  cancelEdit(): void {
    // Reset the original values of the selected alarm
    if (this.selectedAlarm && this.originalAlarm) {
      Object.assign(this.selectedAlarm, this.originalAlarm);
    }
    // Close the edit form
    this.showEditForm = false;
  }
  
  


openDeleteConfirmation(alarm: any): void {
  this.selectedAlarmForDelete = alarm;
  this.isDeleteConfirmationOpen = true;

}

closeDeleteConfirmation(): void {
  this.isDeleteConfirmationOpen = false;
 
}


deleteAlarm(id: number): void {
  this.isDeleteConfirmationOpen = true;

  // Call the deleteAlarm method of your AlarmService
  this.AlarmService.deleteAlarm(id).subscribe(
    () => {
      // Remove the deleted alarm from the local array
      this.alarms = this.alarms.filter(a => a.id !== id);
      console.log('Alarm deleted successfully');
      alert('RECORD DELETED');
      // Close the delete confirmation modal
      if (this.alarms.length > 0) {
        this.selectedAlarm = this.alarms[0];
      } else {
        this.selectedAlarm = null;
      }
      this.closeDeleteConfirmation();
   
    },
    error => {
      console.error('Error deleting alarm:', error);

    }
  );
}
changesMade: boolean = false; 
enableSaveButton(): void {
    this.changesMade = true;
  }


toggleFilterOptions(): void {
    this.showFilterOptions = !this.showFilterOptions;
  }

   resetForm() {
        this.changesMade = false;
    }

  // filterByPriority(): void {
  //   if (this.selectedPriority) {
  //     // Filter original alarms based on selected priority
  //     this.alarms = this.originalAlarms.filter(alarm => alarm.priority === this.selectedPriority);
  //   } else {
  //     // Reset alarms to original list if no priority is selected
  //     this.alarms = [...this.originalAlarms];
  //   }
  // }
  filterByPriority(): void {
    if (this.selectedPriority === 'All') {
      this.alarms = [...this.originalAlarms]; // Show all alarms
    } else {
      // Filter original alarms based on selected priority
      this.alarms = this.originalAlarms.filter(alarm => alarm.priority === this.selectedPriority);
    }
  }
  
}