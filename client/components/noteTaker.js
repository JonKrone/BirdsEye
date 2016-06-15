// Is note taking a service?
// Make notes taggable
function NoteTakerController($http, $stateParams, store) {
	const ctrl = this;

	ctrl.note = {};

	ctrl.takingNote = false;
	ctrl.takeNote = function() {
		ctrl.takingNote = !ctrl.takingNote;
	};

	ctrl.selectedNote = null;
	ctrl.noteIsSelected = () => !!ctrl.selectedNote;
	ctrl.selectNote = function(note) {
		console.log('$ctrl.notes:', ctrl.notes);
		ctrl.selectedNote = note;
	};

	ctrl.closeNote = function() {
		ctrl.selectedNote = null;
	}

	ctrl.submitNote = function() {
		// if (ctrl.homeList)

		ctrl.note.author = store.get('profile').user_id;
		ctrl.noteList.push(ctrl.note);

		const customer_id = $stateParams.customer.customer_id;
			$http.post(`/customers/${customer_id}/notes`, { note: ctrl.note })
			.then(postNoteSuccess, postNoteError);
	};

	ctrl.$onInit = function() {
		// Can we just transfer notes when we fetch all customers or should
		// we only do so once we've selected a customer?
		// Fetching on customer selection was chosen because over time,
		// notes for all customers could be a heavy resource fetch.
		const customer_id = $stateParams.customer.customer_id;
		ctrl.noteList = [];

		$http.get(`/customers/${customer_id}/notes`)
			.then(getNotesSuccess, getNotesError);
	};

	function postNoteSuccess(response) {
		// again, tough call. Finding by index is an intensive operation, especially
		// when we have a pointer to the note we want already. The downside is that we
		// are retroactively changing an array. In this case, because this controller
		// owns the array, I have chosen to change it indirectly. I would likely not
		// do this in a production codebase, in favor of being more explicit and less
		// dependent on the state of this controller.
		ctrl.note.note_id = response.data.note_id;

		ctrl.note = {};
	}

	function postNoteError(error) {
		console.error('Error creating note:', error);
		const idx = ctrl.noteList.indexOf(ctrl.note);
		ctrl.noteList.splice(idx, 1);

		// inform messaging service.
	}

	function getNotesSuccess(response) {
		console.log('NOTES response.data!', response.data);

		ctrl.noteList = response.data;
	}
	function getNotesError(error) {
		console.error("Error fetching customer's notes.", error);
		// inform messaging service
	}
}

angular.module('birdsNest').component('noteTaker', {
	templateUrl: "../views/noteTaker.html",
	controller: NoteTakerController,
	// bindings: {
	// 	homeList: '^homeList',
	// 	roomList: '^roomList',
	// }
});