import { Injectable } from '@angular/core';
import { TracerModal } from '../modals/tracer.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class TracersService {

  constructor(private bllService: LayoutBLLService,) { }

  onAllTracers(): TracerModal[] {

    this.updateTB()
    
    let allTracers: TracerModal[] = []
    for (let i = 0; i < tracersTB.length; i++) {
      allTracers.push(tracersTB[i])
    }
    return allTracers;
  }

  onDeleteTracer(id: string) {

    // this.updateTB()
    
    let indexTracer = tracersTB.findIndex(elt => elt.id === id)
    if(indexTracer > -1)
    {
      tracersTB.splice(indexTracer, 1)
    }
    this.updateTable()
  }

  onAddTracer(tracer: TracerModal) {

    // this.updateTB()
    
    tracer.id = "" + (Number.parseInt(this.bllService.getLastIdFromData(tracersTB)) + 1 );
    tracersTB.push(tracer);
    this.updateTable()
  }

  onUpdateTracer(tracer: TracerModal) {

    // this.updateTB()

    let indexTracer = tracersTB.findIndex(elt => elt.id === tracer.id);
    if(indexTracer > -1)
    {
      tracersTB[indexTracer] = tracer;
      this.updateTable()
    }
  }
  
  updateTable()
  {
    localStorage.setItem("tracersTable", JSON.stringify(tracersTB))
  }

  updateTB()
  {
    let loaclTB: any = localStorage.getItem("tracersTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      tracersTB = loaclTB;
  }


}

export let tracersTB: TracerModal[] = [];

(window as any).tracersTB = function()
{
  return tracersTB;
};