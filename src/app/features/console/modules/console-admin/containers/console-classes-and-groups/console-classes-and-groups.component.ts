import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ClassesService } from 'src/app/root-store/classes.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchGeneratedGroups, fetchAllClasses, deleteGroup, performDrop, deleteClass, addClasses, createGroup, deleteLocalGroup, performInitialDrop, removeClassFromGroup, fetchAssignedClasses, createGroupRequest, sendGroupsWithClasses } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectConsoleGroups, selectConsoleSelectedClasses, selectConsoleAssignedClasses, selectAssignedClassesIntersection } from '../../ngrx/selectors/console-classes';
import { GeneratedGroupsModel } from '../../models/generated-groups.model';


@Component({
  selector: 'edu-console-classes-and-groups',
  templateUrl: './console-classes-and-groups.component.html',
  styleUrls: ['./console-classes-and-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleClassesAndGroupsComponent implements OnInit, OnDestroy {
  isOpen = false;
  classes$: Observable<ExtendedClassModel[]>;
  assignedClasses$: Observable<ExtendedClassModel[]>;
  classesLoading$ = this.classService.loading$;
  localCopy: ExtendedClassModel[];
  classIntersection$: Observable<ExtendedClassModel[]>;
  cancelationFallback: ExtendedClassModel[];
  classesAndGroups$: Observable<GeneratedGroupsModel[]>;
  toBeDeleted: ExtendedClassModel[] = [];
  groupsCopy: GeneratedGroupsModel[];
  activeArr = [];
  tempActiveArr = [];
  multiselectPopoverState = false;
  @ViewChild('badges') badges: ElementRef<HTMLDivElement>;
  ngOnDestroy() {
    this.store.dispatch(sendGroupsWithClasses())
  }
  ngOnInit(): void {
    alert('hello')
    this.store.dispatch(fetchAllClasses())
    this.store.dispatch(fetchAssignedClasses())
    this.store.dispatch(fetchGeneratedGroups())
    this.classes$ = this.store.select(selectConsoleSelectedClasses);
    this.classesAndGroups$ = this.store.select(selectConsoleGroups);
    this.classIntersection$ = this.store.select(selectAssignedClassesIntersection);
    this.assignedClasses$ = this.store.select(selectConsoleAssignedClasses);
    this.classesAndGroups$.subscribe(groups => {
      console.log(groups);
      this.groupsCopy = JSON.parse(JSON.stringify(groups)) as GeneratedGroupsModel[];
    })
    this.classIntersection$.subscribe(classes => {
      this.cancelationFallback = JSON.parse(JSON.stringify(classes));
      this.localCopy = JSON.parse(JSON.stringify(classes));
    });
    this.classService.getAll()
    this.badgeMultiSelect = this.badgeArr.map(badge => ({
      value: badge,
      display: badge
    }));
    console.log(this.badgeMultiSelect);
    this.classIntersection$.subscribe(x => console.log('hoooooo', x))
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
    console.log(this.cancelationFallback, this.localCopy)
    console.log(added, deleted);
    // if (deleted.length) {
    deleted.forEach(classItem => this.store.dispatch(deleteClass({ class: classItem })))
    // }
    this.isOpen = false;
  }
  classesAdded(fallback: ExtendedClassModel[], localCopy: ExtendedClassModel[]) {
    const addedClasses: ExtendedClassModel[] = [];
    for (let i = 0; i < localCopy.length; i++) {
      let addedIdx = fallback.findIndex(classItem => classItem.id === localCopy[i].id);
      if (!fallback[addedIdx].selected && localCopy[i].selected) {
        addedClasses.push(localCopy[i]);
      }
    }
    return addedClasses;
  }
  classesDeleted(fallback: ExtendedClassModel[], localCopy: ExtendedClassModel[]) {
    const deletedClasses: ExtendedClassModel[] = [];
    for (let i = 0; i < fallback.length; i++) {
      let deletedIdx = localCopy.findIndex(classItem => classItem.id === fallback[i].id);
      if (!localCopy[deletedIdx].selected && fallback[i].selected) {
        deletedClasses.push(fallback[i]);
      }
    }
    return deletedClasses;
  }
  createGroup() {
    this.store.dispatch(createGroupRequest())
  }
  onDeleteGroup() {

  }
  onCloseMultiSelect() {
    // this.localCopy = this.cancelationFallback;
  }
  eduTickClick() {
    this.multiselectPopoverState = !this.multiselectPopoverState;
    this.toBeDeleted.sort((classItemA, classItemB) => classItemA.grade - classItemB.grade)
    // this.isOpen = true;

    const itemA = this.cancelationFallback;
    const itemB = this.localCopy;
    const deleted = this.classesDeleted(itemA, itemB)
    const added = this.classesAdded(itemA, itemB);
    console.log(deleted, added)
    if (deleted.length > 0) {
      this.isOpen = true;
    }
    if (added.length > 0) {
      this.store.dispatch(addClasses({ classes: added }))
    }
  }

  constructor(private classService: ClassesService, private renderer: Renderer2, private store: Store) {
  }
}
