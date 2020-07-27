import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClassesService } from 'src/app/root-store/classes.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchGeneratedGroups, fetchAllClasses, deleteGroup, performDrop, deleteClass, addClasses, createGroup, deleteLocalGroup, performInitialDrop, removeClassFromGroup } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectConsoleGroups, selectConsoleSelectedClasses } from '../../ngrx/selectors/console-classes';
import { GeneratedGroupsModel } from '../../models/generated-groups.model';


@Component({
  selector: 'edu-console-classes-and-groups',
  templateUrl: './console-classes-and-groups.component.html',
  styleUrls: ['./console-classes-and-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleClassesAndGroupsComponent implements OnInit {
  isOpen = false;
  classes$: Observable<ExtendedClassModel[]>;
  classesLoading$ = this.classService.loading$;
  localCopy: ExtendedClassModel[];
  cancelationFallback: ExtendedClassModel[];
  classesAndGroups$: Observable<GeneratedGroupsModel[]>;
  toBeDeleted: ExtendedClassModel[] = [];
  groupsCopy: GeneratedGroupsModel[];
  activeArr = [];
  tempActiveArr = [];
  multiselectPopoverState = false;
  @ViewChild('badges') badges: ElementRef<HTMLDivElement>;
  ngOnInit(): void {
    this.store.dispatch(fetchAllClasses())
    this.store.dispatch(fetchGeneratedGroups())
    this.classes$ = this.store.select(selectConsoleSelectedClasses);
    this.classesAndGroups$ = this.store.select(selectConsoleGroups);
    this.classesAndGroups$.subscribe(groups => {
      console.log(groups);
      this.groupsCopy = JSON.parse(JSON.stringify(groups)) as GeneratedGroupsModel[];
    })
    this.classes$.subscribe(classes => {
      this.cancelationFallback = JSON.parse(JSON.stringify(classes));
      this.localCopy = JSON.parse(JSON.stringify(classes));
    });
    this.classService.getAll()
    this.badgeMultiSelect = this.badgeArr.map(badge => ({
      value: badge,
      display: badge
    }));
    console.log(this.badgeMultiSelect);
  }

  badgeArr = new Array(9).fill('');
  badgeMultiSelect = [];
  dropZoneArr = [
    { title: 'primary', popoverIsOpened: false },
    { title: 'middle', popoverIsOpened: false },
    { title: 'secondary', popoverIsOpened: false },
    { title: 'higher secondary', popoverIsOpened: false }
  ];
  onBadgesDragOver(event) {
    event.preventDefault();
    this.renderer.addClass(this.badges.nativeElement, 'badges--dragged-over');
  }
  onBadgesDragLeave(event) {
    event.preventDefault();
    this.renderer.removeClass(this.badges.nativeElement, 'badges--dragged-over');
  }
  onBadgesDrop(event) {
    event.preventDefault();
    const data: ExtendedClassModel = JSON.parse(event.dataTransfer.getData('Text'));
    this.renderer.removeClass(this.badges.nativeElement, 'badges--dragged-over');
    console.log(data);
    this.store.dispatch(removeClassFromGroup({ class: data }))
  }
  deletePopoverState = false;
  deleteGroupItem(group: GeneratedGroupsModel) {
    if (group.id) {
      this.store.dispatch(deleteGroup({ group }))
    } else {
      this.store.dispatch(deleteLocalGroup({ group }))
    }
    this.toggleDeletePopover();
  }
  onDragEnter(event, group: GeneratedGroupsModel) {
    event.preventDefault();
    group.draggedOver = true;
  }
  onDrop(event, group: GeneratedGroupsModel) {
    event.preventDefault();
    const droppedClass: ExtendedClassModel = JSON.parse(event.dataTransfer.getData('Text'));
    if (group.classes.find(classItem => classItem.id === droppedClass.id)) {
      return;
    }
    group.draggedOver = false;
    if (droppedClass.dragged) {
      this.store.dispatch(performDrop({ group, droppedClass }))
    } else {
      this.store.dispatch(performInitialDrop({ group, droppedClass }))
    }
  }
  onDragLeave(event, group: GeneratedGroupsModel) {
    event.preventDefault();
    group.draggedOver = false;
  }
  toggleDeletePopover() {
    this.deletePopoverState = !this.deletePopoverState;
  }
  isActive(value) {
    return this.tempActiveArr.indexOf(value) !== -1;
  }
  openMultiSelect() {
    this.tempActiveArr = [...this.activeArr];
  }

  closeWithoutTick() {
    this.tempActiveArr = [];
  }
  toggleOption(value: ExtendedClassModel) {
    value.selected = !value.selected;
    this.toBeDeleted.push(value);
  }
  onCancel() {
    this.isOpen = false;
    this.localCopy = this.cancelationFallback;
  }
  onDelete() {
    const itemA = this.cancelationFallback;
    const itemB = this.localCopy;
    const deleted = this.classesDeleted(itemA, itemB)
    const added = this.classesAdded(itemA, itemB);

    if (deleted.length) {
      deleted.forEach(classItem => this.store.dispatch(deleteClass({ class: classItem })))
    }
    if (added.length) {
      this.store.dispatch(addClasses({ classes: added }))
    }
    this.isOpen = false;
  }
  classesAdded(itemA: ExtendedClassModel[], itemB: ExtendedClassModel[]) {
    const addedClasses: ExtendedClassModel[] = [];
    for (let i = 0; i < itemB.length; i++) {
      let addedIdx = itemB.findIndex(classItem => classItem.id === itemA[i].id && classItem.selected !== itemB[i].selected);
      if (addedIdx > -1) {
        addedClasses.push(itemB[addedIdx]);
      }
    }
    return addedClasses;
  }
  classesDeleted(itemA: ExtendedClassModel[], itemB: ExtendedClassModel[]) {
    const deletedClasses: ExtendedClassModel[] = [];
    for (let i = 0; i < itemB.length; i++) {
      let deletedIdx = itemA.findIndex(classItem => classItem.id === itemB[i].id && classItem.selected !== itemB[i].selected);
      if (deletedIdx > -1) {
        deletedClasses.push(itemB[deletedIdx]);
      } else {
        // console.log(itemA, itemB[i])
      }
    }
    return deletedClasses;
  }
  createGroup() {
    this.store.dispatch(createGroup())
  }
  onDeleteGroup() {

  }
  onCloseMultiSelect() {
    // this.localCopy = this.cancelationFallback;
  }
  eduTickClick() {
    this.multiselectPopoverState = !this.multiselectPopoverState;
    this.toBeDeleted.sort((classItemA, classItemB) => classItemA.grade - classItemB.grade)
    this.isOpen = true;
  }

  constructor(private classService: ClassesService, private renderer: Renderer2, private store: Store) {
  }
}
