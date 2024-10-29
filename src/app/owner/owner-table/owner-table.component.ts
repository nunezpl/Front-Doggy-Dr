import { ChangeDetectorRef, Component } from '@angular/core';
import { Owner } from '../owner';
import { OwnerService } from 'src/app/service/owner.service';
import { forkJoin, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-owner-table',
  templateUrl: './owner-table.component.html',
  styleUrls: ['./owner-table.component.css']
})
export class OwnerTableComponent {
  selectedOwner: Owner = {
    id: 0,
    name: '',
    username: '',
    document: 0,
    phone: 0,
    mail: '',
    pets: []
  };
    //Bd falsa
  ownersList!: Owner[];
  searchQuery: string = ''; // Término de búsqueda

  //Inyectar dependencias
  constructor(
    private ownerService: OwnerService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  //realizo llamados cuando ya está cargada la interfaz
  ngOnInit(): void {
    this.ownerService.findAll().pipe(
      mergeMap((owners) => {
        this.ownersList = owners;
        console.log('Owners List:', this.ownersList);
    
        // Aquí devuelve un observable que emite un array de observables
        return forkJoin(
          owners.map(owner => 
            this.ownerService.findOwnerPets(owner.id).pipe(
              map(pets => {
                // Asigna las mascotas al owner correspondiente
                owner.pets = pets;
                return pets;
              })
            )
          )
        );
      })
    ).subscribe(
      (results) => {
        // Aquí tienes los resultados de cada llamada al servicio para cada owner
        console.log('Results for each owner:', results);
        // Puedes almacenar estos resultados en un array o procesarlos como necesites
      },
      (error) => {
        console.error('Error fetching owners or their data:', error);
      }
    );
  }
  
  // Método para filtrar clientes según el término de búsqueda
  filteredOwners() {
    if (!this.searchQuery) {
      return this.ownersList;
    }
    return this.ownersList.filter(owner =>
      owner.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  showOwnert(owner: Owner){
    this.selectedOwner = owner;
  }

  editOwner(owner: Owner) {
    //this.petList.push(pet);
    console.log('Edit Owner', owner);
    this.selectedOwner = { ...owner };
  }

  deleteOwner(owner: Owner) {
    console.log('Delete owner', owner);
    var index = this.ownersList.indexOf(owner);
    if (index !== -1) {
      this.ownersList.splice(index, 1);  // Elimina el elemento de la lista
      this.ownerService.deleteById(owner.id);
    }
  }

  addOwner(owner: Owner) {
    // Si es una edición (el ID ya existe), actualiza el registro existente
    const index = this.ownersList.findIndex(p => p.id === owner.id);
    if (index !== -1) {
      this.ownersList[index] = owner; // Actualiza la mascota existente
      console.log('Updated owner:', owner);
    } else {
      // Si es una nueva mascota, asigna un nuevo ID
      owner.id = this.ownersList.length > 0 ? Math.max(...this.ownersList.map(p => p.id)) + 1 : 1;
      this.ownersList.push(owner); // Agrega la nueva mascota
      this.ownerService.addOwner(owner);
      console.log('Added new owner:', owner);
    }

    this.cdr.detectChanges(); // Forzar detección de cambios

    // Reinicia la mascota seleccionada después de agregar o editar
    this.resetSelectedPet();
  }
  
  resetSelectedPet() {
    this.selectedOwner = {
      id: 0,
      name: '',
      username: '',
      document: 0,
      phone: 0,
      mail: '',
      pets: []
    };
  }
}
