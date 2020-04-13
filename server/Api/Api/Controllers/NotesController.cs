using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {

        [HttpGet]
        public ActionResult<IEnumerable<string>> getString()
        {
            return new String[] { "test", "test2" };
        }

    }
}